import "./App.css";
import { useStore } from "./zustand/store";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import UserDetailsCard from "./elements/UserDetailsCard";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "./components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
});

function App() {
  const { updateUser, user } = useStore();

  const { toast } = useToast();
  const [userMode, setUserMode] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      address: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {

    updateUser({
      username: values.username,
      email: values.email,
      address: values.address,
    });
    toast({
      variant: "success",
      title: "Form, Submitted Successfully",
      description: String(new Date()),
    });
  };


  return (
    <>
      <h1 className="text-3xl text-center mt-4 font-semibold">
        Getting Hands 🙌 dirty with Zustand 🐻
      </h1>

      <h1 className="text-center mt-4 flex justify-center items-center gap-4">
        <Badge variant={userMode ? "outline" : "default"}>User Mode</Badge>
        <Switch onCheckedChange={(e) => setUserMode(e)} />
        <Badge variant={userMode ? "default" : "outline"}>Admin Mode</Badge>
      </h1>

      {!userMode ? (
        <section className="m-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What should we call you</FormLabel>
                    <FormControl>
                      <Input placeholder="Please enter your name" {...field} />
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
                    <FormLabel>email address @</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your address ( Home/ Office )</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter your address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </section>
      ) : (
        <UserDetailsCard />
      )}
    </>
  );
}

export default App;
