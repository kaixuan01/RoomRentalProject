import { Input } from "reactstrap";
import MultiSelect from "../Control/Multiselect"
export const  InputFilter = ({ column: { filterValue, setFilter, Header } }) => (
    <Input
        // value={filterValue || ''}
        onChange={e => setFilter(e.target.value || undefined)}
        placeholder={`Filter by ${Header}`}
        style={{ width: '100%' }}
    />
);

export const MultiSelectFilter = ({ column: { filterValue, setFilter, Header }, options }) => {
    const mappedOptions = options.map(option => ({
        value: option.id,
        label: option.name,
    }));

    const selectedNames = filterValue
        ? filterValue.map(selected => {
            const matchedOption = options.find(option => option.id === selected);
            return matchedOption ? matchedOption.name : '';
          })
        : [];

    return (
      <div>
        <MultiSelect
          options={mappedOptions}
          selectedValues={filterValue || []}
          onChange={selectedOptions => {
            setFilter(selectedOptions.length > 0 ? selectedOptions : undefined);
          }}
        />
        <div>
          {selectedNames.length > 0 ? selectedNames.join(', ') : 'No selections'}
        </div>
      </div>
    );
};
  