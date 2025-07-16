import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  studentId: z.string().min(2, { message: "Student ID is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(11, { message: "Phone number must be at least 11 digits" }),
  passingProgram: z.string().min(1, { message: "Please select a passing program" }),
  cgpa: z.string().min(1, { message: "CGPA is required" }),
  transcript: z.any().optional(),
  applyFor: z.string().min(1, { message: "Please select a program to apply for" }),
  recommender1Email: z.string().email({ message: "Invalid email address" }),
  recommender2Email: z.string().email({ message: "Invalid email address" }),
});

const FormFillup: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      studentId: "",
      email: "",
      phone: "",
      passingProgram: "",
      cgpa: "",
      applyFor: "",
      recommender1Email: "",
      recommender2Email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("Form submitted successfully!");
  }

  return (
    <main className="container mx-auto px-4 py-40 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#13274C]">Application Form</h1>
        <p className="text-lg mb-8 text-center">
          Please fill out the form below to apply for admission to the Department of Computer Science and Engineering, University of Dhaka.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Details Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#13274C] border-b pb-2">Personal Details</h2>
                
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your student ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Academic Background Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#13274C] border-b pb-2">Academic Background</h2>
                
                <FormField
                  control={form.control}
                  name="passingProgram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passing Program</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your passing program" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="B.Sc">B.Sc</SelectItem>
                          <SelectItem value="M.Sc">M.Sc</SelectItem>
                          <SelectItem value="PhD">PhD</SelectItem>
                          <SelectItem value="MPhil">MPhil</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cgpa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CGPA</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your CGPA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="transcript"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Transcript</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept=".pdf,.jpg,.jpeg,.png" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }} 
                        />
                      </FormControl>
                      <FormDescription>
                        Upload your transcript in PDF, JPG, or PNG format.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Program Selection Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#13274C] border-b pb-2">Program Selection</h2>
                
                <FormField
                  control={form.control}
                  name="applyFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apply For</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select program to apply for" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="M.Sc">M.Sc</SelectItem>
                          <SelectItem value="PhD">PhD</SelectItem>
                          <SelectItem value="MPhil">MPhil</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Recommenders Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#13274C] border-b pb-2">Recommenders</h2>
                
                <FormField
                  control={form.control}
                  name="recommender1Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recommender 1 Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter recommender's email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="recommender2Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recommender 2 Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter recommender's email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#FFC300] hover:bg-[#FFD720]/90 text-black font-bold py-2"
              >
                Submit Application
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default FormFillup;