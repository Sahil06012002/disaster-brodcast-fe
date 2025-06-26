import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { forwardRef, useImperativeHandle } from "react";
import apiClient from "@/services/ApiClient";

const tagsRegex = /^#\w+( #\w+)*$/;

const DisasterSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  tags: z
    .string()
    .regex(
      tagsRegex,
      "Tags must start with '#' and be separated by spaces, e.g., '#tag1 #tag2'"
    ),
});

const defaultValues = {
  title: "",
  location: "",
  description: "",
  tags: "",
};

export interface RegisterDisasterFormRef {
  submit: () => Promise<boolean>;
}

const RegisterDisasterForm = forwardRef<RegisterDisasterFormRef>(
  (_props, ref) => {
    const form = useForm<z.infer<typeof DisasterSchema>>({
      resolver: zodResolver(DisasterSchema),
      defaultValues,
    });

    const onSubmit = (data: z.infer<typeof DisasterSchema>) => {
      const user_id = parseInt(localStorage.getItem("user_id") || "", 10);
      const tagsArray = data.tags.trim().split(/\s+/);

      const payload = { user_id, ...data, tags: tagsArray };

      apiClient.post("/disasters", payload).then((res) => {
        console.log(res);
      });
    };

    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await form.trigger();
        if (isValid) {
          const data = form.getValues();
          onSubmit(data);
          return true;
        }
        return false;
      },
    }));

    return (
      <div className="w-full max-w-2xl mx-auto">
        {/* <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
          Register Disaster
        </h2> */}
        <Form {...form}>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Flood in Mumbai" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Mumbai, India" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe the disaster details..."
                      className="min-h-[8rem]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="#flood #mumbai #2025" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  }
);

RegisterDisasterForm.displayName = "RegisterDisasterForm";

export default RegisterDisasterForm;
