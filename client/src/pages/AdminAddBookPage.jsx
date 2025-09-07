import React, { useContext } from "react";
import AddBookForm from "../components/AddBookForm";
import AuthContext from "../context/AuthContext";

export default function AdminAddBookPage() {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "Admin") return null;
  return <AddBookForm />;
}
