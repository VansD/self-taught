
type EnumType = { [key: string]: string | number };

export type SelectOpion = {
    label: string;
    value: string | number;
};

export const enumToSelectOptions = (data: EnumType): SelectOpion[] =>
    Object.keys(data)
        .filter((key) => Number.isNaN(+key))
        .map((key: string) => {
            return {
                label: key,
                value: data[key]
            } as SelectOpion
        });

