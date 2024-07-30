import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DefaultValues, Path, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Option, SearchSelect } from "./search-select";

type FormBuilderProps<T extends z.ZodObject<any, any>> = {
  zodSchema: T;
  onSubmit: (data: z.infer<T>) => void;
  options?: Partial<
    Record<keyof z.infer<T>, (key: string) => Promise<Option[]>>
  >;
  title?: string;
  description?: string;
  loading?: boolean;
  defaultValues?: DefaultValues<z.infer<T>>;
};

export function FormBuilder<T extends z.ZodObject<any, any>>({
  zodSchema,
  onSubmit,
  title = "Dynamic Form",
  description = "Please fill out the form",
  loading,
  options,
  defaultValues,
}: FormBuilderProps<T>) {
  type SchemaType = z.infer<T>;

  const form = useForm<SchemaType>({
    resolver: zodResolver(zodSchema),
    mode: "onChange",
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(onSubmit);

  const renderFormField = (key: Path<SchemaType>, field: z.ZodTypeAny) => {
    const title = field.description ?? "Set description for this field";
    const optional = field.isOptional();

    // check the field if it has options
    const dropDownOptionsFetch = options?.[key];

    if (dropDownOptionsFetch) {
      return (
        <FormField
          key={key as string}
          control={form.control}
          name={key}
          render={({ field: _field }) => (
            <FormItem>
              <FormLabel>
                {title}
                {optional ? "" : "*"}
              </FormLabel>
              <FormControl>
                <SearchSelect
                  onChange={(value) => _field.onChange(value)}
                  searchForKey={dropDownOptionsFetch}
                  value={_field.value?.label ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    // check if field is enum
    const isEnum = field._def?.typeName === "ZodEnum";
    if (isEnum) {
      const enumValues = field._def.values as string[];
      const enumOptions = enumValues.map((value) => ({
        label: value,
        value: value,
      }));
      return (
        <FormField
          key={key as string}
          control={form.control}
          name={key}
          render={({ field: _field }) => (
            <FormItem>
              <FormLabel>
                {title}
                {optional ? "" : "*"}
              </FormLabel>
              <FormControl>
                <SearchSelect
                  onChange={(value) => _field.onChange(value.value)}
                  searchForKey={async (key: string) => {
                    return enumOptions.filter((option) =>
                      option.value.toLowerCase().includes(key.toLowerCase())
                    );
                  }}
                  value={_field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    return (
      <FormField
        key={key as string}
        control={form.control}
        name={key}
        render={({ field: _field }) => (
          <FormItem>
            <FormLabel>
              {title}
              {optional ? "" : "*"}
            </FormLabel>
            <FormControl>
              <Input
                {..._field}
                value={_field.value ?? ""}
                onChange={_field.onChange}
                disabled={loading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderFields = () => {
    return Object.entries(zodSchema.shape).map(([key, field]) =>
      renderFormField(key as Path<SchemaType>, field as z.ZodTypeAny)
    );
  };

  return (
    <div className="grid h-full w-full grid-rows-1 place-items-center">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="contents">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 ">{renderFields()}</CardContent>
            <CardFooter>
              <Button
                className="w-full"
                type="submit"
                disabled={!form.formState.isValid}
                loading={loading}
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
