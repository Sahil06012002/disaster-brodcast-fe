import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { forwardRef, useImperativeHandle } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { X } from "lucide-react";
import apiClient from "@/services/ApiClient";
import type { UploadUrlReponse } from "@/interfaces/UploadUrlResponse";

export interface AddReportFormRef {
  submit: () => Promise<boolean>;
}

interface AddReportFormProp {
  disaster_id: number;
}

const AddReportForm = forwardRef<AddReportFormRef, AddReportFormProp>(
  (_props, ref) => {
    const uploadReportSchema = z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      images: z.any().optional(),
    });

    const [previewImages, setPreviewImages] = useState<File[]>([]);
    const form = useForm<z.infer<typeof uploadReportSchema>>({
      resolver: zodResolver(uploadReportSchema),
    });

    const onSubmit = async (formData: z.infer<typeof uploadReportSchema>) => {
      // get the blob url upload to blob and submit the form
      let uploadPaths: string[] = [];

      if (formData.images) {
        try {
          const imagesMeta = formData.images.map((image: File) => {
            return {
              fileName: image.name.replace("|", "-"),
              fileType: image.type,
            };
          });
          const data = {
            bucketName: "disbrod-bucket-1",
            files: imagesMeta,
          };
          const res = await apiClient.post("helper/upload-url", data);
          const resData: UploadUrlReponse[] = res.data.data;

          uploadPaths = await Promise.all(
            resData.map(async (element) => {
              console.log(element.url);
              const imageToUpload: File = formData.images.find(
                (image: File) => image.name == element.fileName
              );
              await apiClient.put(element.url, imageToUpload, {
                headers: {
                  "Content-Type": element.fileType,
                },
              });
              return element.uploadPath;
            })
          );
        } catch (error) {
          console.log(error);
        }
      }
      let image_link = "";
      if (uploadPaths) {
        image_link = uploadPaths.join("|");
      }

      const addReportData = {
        user_id: localStorage.getItem("user_id"),
        disaster_id: _props.disaster_id,
        title: formData.title,
        description: formData.description,
        image_link: image_link,
      };

      apiClient.post("reports", addReportData);
    };

    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await form.trigger();
        if (isValid) {
          const data = form.getValues();
          await onSubmit(data);
          return true;
        }
        return false;
      },
    }));

    const handleImageChange = (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const newFiles = Array.from(fileList);
      const updated = [...previewImages, ...newFiles];
      setPreviewImages(updated);
      form.setValue("images", updated);
    };

    const removeImage = (index: number) => {
      const updated = previewImages.filter((_, i) => i != index);
      setPreviewImages(updated);
      form.setValue("images", updated);
    };
    console.log("props in this comp");
    console.log(_props.disaster_id);
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Form {...form}>
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Description"
                        // className="min-h-[8rem]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel>Add Images</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          handleImageChange(e.target.files);
                        }}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-wrap gap-4 mt-2">
                {previewImages.map((file, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="object-cover w-full h-full rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </Form>
      </div>
    );
  }
);

export default AddReportForm;
