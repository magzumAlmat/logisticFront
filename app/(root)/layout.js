"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Dashboard from "@/components/dashboard/dashboard";
import Header from "@/components/header/header";
import { useState } from "react";
import ReduxProvider from "../../providers/ReduxProvider";
import WithAuth from "../../providers/withAuth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <WithAuth>
            <div className="container">
              <Dashboard />
              <div className="content">
                <Header />
                <main className="main">{children}</main>
              </div>
            </div>
          </WithAuth>
        </ReduxProvider>
      </body>
    </html>
  );
}
