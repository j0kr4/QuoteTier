"use client";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";

const CreateQuoteForm = ({ onQuoteChange, onAuthorChange }: any) => {
  const [Autor, setAutor] = useState([]);
  const fetchAutors = async () => {
    const res = await axios.get("/api/autor");
    setAutor(res.data);
  };
  useEffect(() => {
    fetchAutors();
  }, []);

  const handleQuoteChange = (event: any) => {
    onQuoteChange(event.target.value);
  };

  const handleAuthorChange = (author: any) => {
    onAuthorChange(author);
  };
  return (
    <div className="grid gap-8 py-8">
      <div className="gap-4">
        <Label htmlFor="name" className="text-right">
          Citation{" "}
        </Label>
        <Input onChange={handleQuoteChange} id="quote" className="col-span-3" />
      </div>
      <Select onValueChange={handleAuthorChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select author" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Autor.map((item: any) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default CreateQuoteForm;
