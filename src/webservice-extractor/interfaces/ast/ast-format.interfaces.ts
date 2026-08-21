interface astFieldsCommon {
    kind: string;
}
interface astLeft extends astFieldsCommon{
    name: string;
};

interface astRight extends astFieldsCommon {

};

interface astExpression extends astFieldsCommon {
    left: astLeft;
    right: astRight;
};

interface astChildren extends astFieldsCommon {
    expression?: astExpression[];
}
export interface astFormatMinium extends astFieldsCommon {
    children: astChildren[];
};