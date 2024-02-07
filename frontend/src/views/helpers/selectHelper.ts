
type EnumType = { [key: string]: string | number };

export type SelectOption = {
    label: string;
    value: string | number;
};

export const enumToSelectOptions = (data: EnumType): SelectOption[] =>
    Object.keys(data)
        .filter((key) => Number.isNaN(+key))
        .map((key: string) => {
            return {
                label: key,
                value: data[key]
            } as SelectOption
        });