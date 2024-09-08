import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const requestData = await request.json();

    const response = await axios.put(`${API_URL}/tasks/update/${params.id}`, requestData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (response.status === 200) {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json({ status: response.status, message: "Failed to update task" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    const response = await axios.delete(`${API_URL}/tasks/delete/${params.id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json({ status: response.status, message: "Failed to delete task" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
};
