import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";

interface BaseFieldProps {
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
}

interface InputFieldProps extends BaseFieldProps {
    fieldType: "input";
    type?: string;
}

interface TextareaFieldProps extends BaseFieldProps {
    fieldType: "textarea";
}



type FormInputProps =
    | InputFieldProps
    | TextareaFieldProps
   

export function FormInput(props: FormInputProps) {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={props.name}
            render={({ field }) => (
                <FormItem>
                    <Label>{props.label}</Label>
                    <FormControl>{renderFieldByType(props, field)}</FormControl>
                    {props.description && (
                        <FormDescription>{props.description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

function renderFieldByType(props: FormInputProps, field: any) {
    switch (props.fieldType) {
        case "input":
            return (
                <Input
                    type={props.type || "text"}
                    placeholder={props.placeholder}
                    {...field}
                />
            );
        case "textarea":
            return (
                <Textarea
                    placeholder={props.placeholder}
                    className="resize-none"
                    {...field}
                />
            );
       
       
        default:
            return null;
    }
}