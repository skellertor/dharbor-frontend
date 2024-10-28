import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { modalTypes } from "@/lib/utils";

export function AddEditForm({
  action,
  isModalOpen,
  isActionLoading,
  setIsModalOpen,
  modalType = modalTypes.add,
  duck,
}) {
  return (
    <Dialog
      onOpenChange={() => setIsModalOpen((prev) => !prev)}
      open={isModalOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {modalType === modalTypes.add ? "Add Duck" : "Edit Duck"}
          </DialogTitle>
          <DialogDescription>
            {`Fill out form to ${modalType} duck. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={action}>
          <div className="grid grid-cols-4 items-center gap-4">
            <input type="hidden" value={duck?.id} name="id" />
            <Label htmlFor="color" className="text-right">
              Color
            </Label>
            <Select
              id="color"
              name="color"
              required
              disabled={modalType !== modalTypes.add}
              defaultValue={duck?.color}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="RED">Red</SelectItem>
                  <SelectItem value="YELLOW">Yellow</SelectItem>
                  <SelectItem value="GREEN">Green</SelectItem>
                  <SelectItem value="BLACK">Black</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="size" className="text-right">
              Size
            </Label>
            <Select
              id="size"
              name="size"
              required
              disabled={modalType !== modalTypes.add}
              defaultValue={duck?.size}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sizes</SelectLabel>
                  <SelectItem value="XSMALL">X-small</SelectItem>
                  <SelectItem value="SMALL">Small</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LARGE">Large</SelectItem>
                  <SelectItem value="XLARGE">X-large</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              className="col-span-3"
              type="number"
              min="1"
              step="1"
              required
              defaultValue={duck?.quantity}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              className="col-span-3"
              type="number"
              step=".01"
              required
              defaultValue={duck?.price}
            />
          </div>
          <Button type="submit">
            {isActionLoading ? "Loading" : "Save changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
