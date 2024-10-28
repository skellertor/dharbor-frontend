import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { AddEditForm } from "./components/addEditForm";
import { Button } from "./components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { modalTypes } from "./lib/utils";

import "./App.css";

function App() {
  const [modalType, setModalType] = useState(modalTypes.add);
  const [isModalOpen, setIsModalOpen] = useState();
  const [selectedDuck, setSelectedDuck] = useState();
  const [isAddDuckLoading, setIsAddDuckLoading] = useState(false);
  const [isEditDuckLoading, setIsEditDuckLoading] = useState(false);

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["ducks"],
    queryFn: async () => {
      try {
        const response = await axios.request({
          method: "GET",
          url: `${import.meta.env.VITE_BASE_URL}/ducks`,
        });
        return response.data;
      } catch (e) {
        // TODO: add toast message
        console.error(e);
      }
    },
    initialData: [],
  });

  const handleDelete = async (id) => {
    if (window.confirm(`Delete Duck ${id}?`)) {
      try {
        await axios.request({
          method: "DELETE",
          url: `${import.meta.env.VITE_BASE_URL}/ducks`,
          data: {
            id,
          },
        });
      } catch (e) {
        // TODO: add toast message
        console.error(e);
      } finally {
        refetch();
      }
    }
  };

  const onAdd = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const body = [...data.entries()].reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
    try {
      setIsAddDuckLoading(true);
      await axios.request({
        method: "POST",
        url: `${import.meta.env.VITE_BASE_URL}/ducks`,
        data: body,
      });
    } catch (e) {
      // TODO: add toast message
      console.error(e);
    } finally {
      refetch();
      setIsAddDuckLoading(false);
      setIsModalOpen(false);
    }
  };

  const onEdit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const body = [...data.entries()].reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
    try {
      setIsEditDuckLoading(true);
      await axios.request({
        method: "PUT",
        url: `${import.meta.env.VITE_BASE_URL}/ducks`,
        data: body,
      });
    } catch (e) {
      // TODO: add toast message
      console.error(e);
    } finally {
      refetch();
      setIsEditDuckLoading(false);
      setIsModalOpen(false);
    }
  };

  if (isLoading) {
    return "Loading....";
  }

  if (isError) {
    return "Unable to load page at this time. Try again later";
  }

  return (
    <section>
      <h1 className="p-5">Duck Warehouse</h1>
      <div className="flex justify-start pb-2">
        <Button
          variant="outline"
          onClick={() => {
            setSelectedDuck(null);
            setModalType(modalTypes.add);
            setIsModalOpen(true);
          }}
        >
          Add Duck
        </Button>
      </div>
      <AddEditForm
        action={modalType === modalTypes.add ? onAdd : onEdit}
        isActionLoading={
          modalType === modalType.add ? isAddDuckLoading : isEditDuckLoading
        }
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalType={modalType}
        duck={data.find((duck) => duck.id === selectedDuck)}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">COLOR</TableHead>
            <TableHead className="text-center">SIZE</TableHead>
            <TableHead className="text-center">PRICE</TableHead>
            <TableHead className="text-center">QUANTITY</TableHead>
            <TableHead className="text-center">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        {data.length > 0 && (
          <TableBody>
            {data.map((datum) => (
              <TableRow key={datum.id}>
                <TableCell className="">{datum.id}</TableCell>
                <TableCell>{datum.color}</TableCell>
                <TableCell>{datum.size}</TableCell>
                <TableCell>{datum.price}</TableCell>
                <TableCell className="">{datum.quantity}</TableCell>
                <TableCell>
                  <Button
                    type="button"
                    onClick={() => {
                      setSelectedDuck(datum.id);
                      setModalType("edit");
                      setIsModalOpen(true);
                    }}
                    className="border-none p-0 h-fit bg-transparent text-black hover:bg-transparent"
                  >
                    Edit
                  </Button>
                  <span className="p-3">/</span>
                  <Button
                    type="button"
                    onClick={() => handleDelete(datum.id)}
                    className="border-none p-0 h-fit bg-transparent text-black hover:bg-transparent"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
        {data.length === 0 && (
          <TableCaption className="text-center">
            No ducks to display
          </TableCaption>
        )}
      </Table>
    </section>
  );
}

export default App;
