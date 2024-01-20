import { Autocomplete, FormControl, FormLabel } from "@mui/joy";

export const ClientSelection = ({
  options,
  selectedOptions,
  onChange,
}: {
  options: any[];
  selectedOptions: any[];
  onChange: (value: any[]) => void;
}) => {
  return (
    <FormControl id="multiple-limit-tags">
      <FormLabel>Access to</FormLabel>
      <Autocomplete
        multiple
        placeholder="Select Users"
        limitTags={2}
        options={options || []}
        getOptionLabel={(option) =>
          `${option.first_name} ${option.last_name || ""}`
        }
        defaultValue={selectedOptions}
        value={selectedOptions}
        onChange={(e, value) => {
          onChange(value);
        }}
        filterOptions={(options) =>
          options.filter(
            (o) => !selectedOptions?.map((s) => s.user_id)?.includes(o?.user_id)
          ) || []
        }
      />
    </FormControl>
  );
};
