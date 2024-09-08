import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GET = async (request: NextRequest) => {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const response = await axios.get(`${API_URL}/tasks/getall`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json({ status: response.status, message: "Failed to fetch tasks" });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const requestData = await request.json();

    const response = await axios.post(`${API_URL}/tasks/create`, requestData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (response.status === 200) {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json({ status: response.status, message: "Failed to create task" });
    }
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
};
