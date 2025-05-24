
import React, { useEffect, useState } from "react";
import { supabase, safeSupabaseOperation } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2, Eye, Download, Search, ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { saveAs } from 'file-saver';
import { utils, writeFile } from 'xlsx';

interface FlightBooking {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  airline_name: string;
  flight_details: string;
  screenshot_url: string | null;
  points_required: number;
  status: string;
  created_at: string;
}

const BookTicketLeads = () => {
  const [bookings, setBookings] = useState<FlightBooking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<FlightBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<FlightBooking | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { toast } = useToast();

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      let query = supabase.from("flight_bookings").select("*").order("created_at", { ascending: false });
      
      if (statusFilter && statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }
      
      const data = await safeSupabaseOperation(async () => {
        const response = await query;
        return response;
      });

      console.log("Fetched flight bookings:", data);
      const fetchedBookings = data as FlightBooking[] || [];
      setBookings(fetchedBookings);
      setFilteredBookings(fetchedBookings);
    } catch (error: any) {
      console.error("Error fetching flight bookings:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load flight booking data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  // Handle search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBookings(bookings);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = bookings.filter(booking => 
      booking.first_name.toLowerCase().includes(query) || 
      booking.last_name.toLowerCase().includes(query) || 
      booking.email.toLowerCase().includes(query) || 
      booking.airline_name.toLowerCase().includes(query) || 
      booking.phone.toLowerCase().includes(query) ||
      booking.flight_details.toLowerCase().includes(query)
    );
    
    setFilteredBookings(filtered);
  }, [searchQuery, bookings]);

  const openViewDialog = (booking: FlightBooking) => {
    setCurrentBooking(booking);
    setViewDialog(true);
  };

  const openDeleteDialog = (booking: FlightBooking) => {
    setCurrentBooking(booking);
    setDeleteDialog(true);
  };

  const handleStatusChange = async (status: string) => {
    if (!currentBooking) return;
    setIsUpdating(true);
    try {
      await safeSupabaseOperation(async () => {
        const response = await supabase
          .from("flight_bookings")
          .update({ 
            status, 
            updated_at: new Date().toISOString() 
          })
          .eq("id", currentBooking.id);
        return response;
      });
      
      toast({
        title: "Success",
        description: "Flight booking status updated successfully.",
      });
      setViewDialog(false);
      fetchBookings();
    } catch (error: any) {
      console.error("Error updating flight booking status:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update flight booking status.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!currentBooking) return;
    try {
      await safeSupabaseOperation(async () => {
        const response = await supabase
          .from("flight_bookings")
          .delete()
          .eq("id", currentBooking.id);
        return response;
      });
      
      toast({
        title: "Success",
        description: "Flight booking deleted successfully.",
      });
      setDeleteDialog(false);
      fetchBookings();
    } catch (error: any) {
      console.error("Error deleting flight booking:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete flight booking.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return "bg-blue-100 text-blue-800";
      case 'contacted':
        return "bg-yellow-100 text-yellow-800";
      case 'in progress':
        return "bg-purple-100 text-purple-800";
      case 'completed':
        return "bg-green-100 text-green-800";
      case 'cancelled':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const exportToExcel = () => {
    try {
      const worksheet = utils.json_to_sheet(bookings.map(booking => ({
        Date: formatDate(booking.created_at),
        Name: `${booking.first_name} ${booking.last_name}`,
        Email: booking.email,
        Phone: booking.phone,
        Airline: booking.airline_name,
        Points: booking.points_required.toLocaleString(),
        Status: booking.status,
        'Flight Details': booking.flight_details,
        'Screenshot URL': booking.screenshot_url || "N/A"
      })));

      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Flight Bookings");
      writeFile(workbook, "CashMyPoints_Flight_Bookings.xlsx");

      toast({
        title: "Success",
        description: "Flight bookings exported successfully.",
      });
    } catch (error) {
      console.error("Error exporting flight bookings:", error);
      toast({
        title: "Error",
        description: "Failed to export flight booking data.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Book Ticket Leads</h1>
        <p className="text-gray-500">View and manage flight booking requests</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by name, email, airline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="statusFilter" className="text-sm font-medium whitespace-nowrap">
              Filter by status:
            </label>
            <Select
              value={statusFilter || "all"}
              onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 ml-auto md:ml-0">
            <Button variant="outline" onClick={fetchBookings}>
              Refresh
            </Button>
            <Button variant="outline" onClick={exportToExcel} className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export to Excel
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="border rounded-md p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Airline</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    {searchQuery ? "No flight bookings found matching your search." : "No flight bookings found."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{formatDate(booking.created_at)}</TableCell>
                    <TableCell>{`${booking.first_name} ${booking.last_name}`}</TableCell>
                    <TableCell>{booking.email}</TableCell>
                    <TableCell>{booking.airline_name}</TableCell>
                    <TableCell>{booking.points_required.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openViewDialog(booking)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => openDeleteDialog(booking)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* View/Edit Dialog */}
      <Dialog open={viewDialog} onOpenChange={setViewDialog}>
        <DialogContent className="sm:max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>View Flight Booking Request</DialogTitle>
          </DialogHeader>
          {currentBooking && (
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{`${currentBooking.first_name} ${currentBooking.last_name}`}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>{currentBooking.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p>{currentBooking.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>{formatDate(currentBooking.created_at)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Airline</h3>
                  <p>{currentBooking.airline_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Points Required</h3>
                  <p>{currentBooking.points_required.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Flight Details</h3>
                <p className="whitespace-pre-wrap">{currentBooking.flight_details}</p>
              </div>
              {currentBooking.screenshot_url && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Screenshot</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(currentBooking.screenshot_url!, '_blank')}
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Screenshot
                    </Button>
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <Select
                  defaultValue={currentBooking.status}
                  onValueChange={handleStatusChange}
                  disabled={isUpdating}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" onClick={() => setViewDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Delete Flight Booking</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete this flight booking request for{" "}
              <strong>
                {currentBooking?.first_name} {currentBooking?.last_name}
              </strong>
              ? This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookTicketLeads;
