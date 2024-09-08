import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const LoginComponent = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/VerificationPage/SignIn");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to Ticketing Platform</h1>
      <Button onClick={handleLogin}>Login</Button>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Scan QR Code to Login</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="text-center">
                <p>
                  Please scan this QR code with your mobile device to login.
                </p>
                <div className="my-4">
                  {/* Placeholder QR code */}
                  <img
                    src="/qrcode.png"
                    alt="Login QR Code"
                    className="mx-auto"
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleLogin}>Cancel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LoginComponent;
