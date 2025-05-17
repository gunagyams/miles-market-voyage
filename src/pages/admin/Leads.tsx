
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
import { Trash2, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  airline: string | null;
  miles_amount: number | null;
  message: string | null;
  status: string;
  created_at: string;
}

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewDialog, setViewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const { toast } = useToast();

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
      
      if (statusFilter) {
        query = query.eq("status", statusFilter);
      }
      
      const { data, error } = await query;

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Error",
        description: "Failed to load leads data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const openViewDialog = (lead: Lead) => {
    setCurrentLead(lead);
    setViewDialog(true);
  };

  const openDeleteDialog = (lead: Lead) => {
    setCurrentLead(lead);
    setDeleteDialog(true);
  };

  const handleStatusChange = async (status: string) => {
    if (!currentLead) return;
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status, updated_at: new Date() })
        .eq("id", currentLead.id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Lead status updated successfully.",
      });
      setViewDialog(false);
      fetchLeads();
    } catch (error) {
      console.error("Error updating lead status:", error);
      toast({
        title: "Error",
        description: "Failed to update lead status.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!currentLead) return;
    try {
      const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", currentLead.id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Lead deleted successfully.",
      });
      setDeleteDialog(false);
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast({
        title: "Error",
        description: "Failed to delete lead.",
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
        <p className="text-gray-500">View and manage customer inquiries</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <label htmlFor="statusFilter" className="text-sm font-medium">
            Filter by status:
          </label>
          <Select
            value={statusFilter || ""}
            onValueChange={(value) => setStatusFilter(value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={fetchLeads}>
          Refresh
        </Button>
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
                <TableHead>Miles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No leads found.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>{formatDate(lead.created_at)}</TableCell>
                    <TableCell>{`${lead.first_name} ${lead.last_name}`}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.airline || "-"}</TableCell>
                    <TableCell>
                      {lead.miles_amount ? lead.miles_amount.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(lead.status)}`}>
                        {lead.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openViewDialog(lead)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => openDeleteDialog(lead)}
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>View Lead</DialogTitle>
          </DialogHeader>
          {currentLead && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{`${currentLead.first_name} ${currentLead.last_name}`}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>{currentLead.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p>{currentLead.phone || "-"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>{formatDate(currentLead.created_at)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Airline</h3>
                  <p>{currentLead.airline || "-"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Miles</h3>
                  <p>{currentLead.miles_amount ? currentLead.miles_amount.toLocaleString() : "-"}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Message</h3>
                <p className="whitespace-pre-wrap">{currentLead.message || "-"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <Select
                  defaultValue={currentLead.status}
                  onValueChange={handleStatusChange}
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Lead</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete this lead for{" "}
              <strong>
                {currentLead?.first_name} {currentLead?.last_name}
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

export default Leads;
