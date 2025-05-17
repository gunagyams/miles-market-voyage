
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
import { Edit, Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Airline {
  id: string;
  name: string;
  logo: string;
  price_per_mile: number;
  min_miles: number;
  delivery_estimate: string;
}

const Airlines = () => {
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [currentAirline, setCurrentAirline] = useState<Airline | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    logo: "✈️",
    price_per_mile: 0.015,
    min_miles: 10000,
    delivery_estimate: "24-48 hours",
  });

  const { toast } = useToast();

  const fetchAirlines = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("airlines")
        .select("*")
        .order("name");

      if (error) {
        console.error("Error fetching airlines:", error);
        throw error;
      }
      
      console.log("Fetched airlines:", data);
      setAirlines(data || []);
    } catch (error) {
      console.error("Error fetching airlines:", error);
      toast({
        title: "Error",
        description: "Failed to load airlines data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAirlines();
  }, []);

  const openAddDialog = () => {
    setCurrentAirline(null);
    setFormValues({
      name: "",
      logo: "✈️",
      price_per_mile: 0.015,
      min_miles: 10000,
      delivery_estimate: "24-48 hours",
    });
    setOpenDialog(true);
  };

  const openEditDialog = (airline: Airline) => {
    setCurrentAirline(airline);
    setFormValues({
      name: airline.name,
      logo: airline.logo,
      price_per_mile: airline.price_per_mile,
      min_miles: airline.min_miles,
      delivery_estimate: airline.delivery_estimate,
    });
    setOpenDialog(true);
  };

  const openDeleteDialog = (airline: Airline) => {
    setCurrentAirline(airline);
    setDeleteDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert string values to appropriate types
      const dataToSave = {
        name: formValues.name,
        logo: formValues.logo || "✈️", // Ensure we have a fallback
        price_per_mile: Number(formValues.price_per_mile),
        min_miles: Number(formValues.min_miles),
        delivery_estimate: formValues.delivery_estimate,
        updated_at: new Date().toISOString()
      };
      
      console.log("Saving airline data:", dataToSave);
      
      if (currentAirline) {
        // Update existing airline
        const { error } = await supabase
          .from("airlines")
          .update(dataToSave)
          .eq("id", currentAirline.id);

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
        toast({
          title: "Success",
          description: "Airline updated successfully.",
        });
      } else {
        // Add new airline
        const { error } = await supabase
          .from("airlines")
          .insert([dataToSave]);

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
        toast({
          title: "Success",
          description: "Airline added successfully.",
        });
      }
      setOpenDialog(false);
      fetchAirlines();
    } catch (error: any) {
      console.error("Error saving airline:", error);
      toast({
        title: "Error",
        description: `Failed to save airline data: ${error.message || "Unknown error"}`,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!currentAirline) return;
    try {
      const { error } = await supabase
        .from("airlines")
        .delete()
        .eq("id", currentAirline.id);

      if (error) {
        console.error("Error deleting airline:", error);
        throw error;
      }
      toast({
        title: "Success",
        description: "Airline deleted successfully.",
      });
      setDeleteDialog(false);
      fetchAirlines();
    } catch (error) {
      console.error("Error deleting airline:", error);
      toast({
        title: "Error",
        description: "Failed to delete airline.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Airlines</h1>
          <p className="text-gray-500">Manage airline miles pricing and details</p>
        </div>
        <Button onClick={openAddDialog} className="flex items-center gap-2">
          <Plus className="h-5 w-5" /> Add Airline
        </Button>
      </div>

      {isLoading ? (
        <div className="border rounded-md p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
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
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price per Mile</TableHead>
                <TableHead>Minimum Miles</TableHead>
                <TableHead>Delivery Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {airlines.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No airlines found. Click "Add Airline" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                airlines.map((airline) => (
                  <TableRow key={airline.id}>
                    <TableCell>{airline.logo}</TableCell>
                    <TableCell>{airline.name}</TableCell>
                    <TableCell>${airline.price_per_mile.toFixed(3)}</TableCell>
                    <TableCell>{airline.min_miles.toLocaleString()}</TableCell>
                    <TableCell>{airline.delivery_estimate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openEditDialog(airline)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => openDeleteDialog(airline)}
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

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>
              {currentAirline ? "Edit Airline" : "Add New Airline"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="logo" className="text-right text-sm font-medium">
                  Logo
                </label>
                <Input
                  id="logo"
                  name="logo"
                  value={formValues.logo}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="price_per_mile" className="text-right text-sm font-medium">
                  Price per Mile
                </label>
                <div className="col-span-3 flex items-center">
                  <span className="mr-2">$</span>
                  <Input
                    id="price_per_mile"
                    name="price_per_mile"
                    type="number"
                    value={formValues.price_per_mile}
                    onChange={handleInputChange}
                    min="0.001"
                    step="0.001"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="min_miles" className="text-right text-sm font-medium">
                  Minimum Miles
                </label>
                <Input
                  id="min_miles"
                  name="min_miles"
                  type="number"
                  value={formValues.min_miles}
                  onChange={handleInputChange}
                  className="col-span-3"
                  min="1000"
                  step="1000"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="delivery_estimate" className="text-right text-sm font-medium">
                  Delivery Time
                </label>
                <Input
                  id="delivery_estimate"
                  name="delivery_estimate"
                  value={formValues.delivery_estimate}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Delete Airline</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete <strong>{currentAirline?.name}</strong>? This
              action cannot be undone.
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
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Airlines;
