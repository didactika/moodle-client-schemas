/**
 * Structural schema node kind classification.
 */
export type SchemaKind = 'parameters' | 'object' | 'array' | 'value' | 'description';

/**
 * Base schema node attributes.
 */
export interface BaseSchemaNode {
    kind?: SchemaKind;
    desc?: string;
    description?: string;
    required?: number;
    default?: unknown;
    allownull?: boolean;
}

/**
 * Primitive leaf schema node (maps to external_value).
 */
export interface ValueSchemaNode extends BaseSchemaNode {
    kind?: 'value';
    type: string;
}

/**
 * Associative object schema node (maps to external_single_structure or external_function_parameters).
 */
export interface ObjectSchemaNode extends BaseSchemaNode {
    kind?: 'parameters' | 'object';
    keys: Record<string, SchemaNode>;
}

/**
 * Array list schema node (maps to external_multiple_structure).
 */
export interface ArraySchemaNode extends BaseSchemaNode {
    kind?: 'array';
    content: SchemaNode;
}

/**
 * Union type representing any structural schema node.
 */
export type SchemaNode = ValueSchemaNode | ObjectSchemaNode | ArraySchemaNode;

/**
 * Root signature definition containing parameters and returns schemas.
 */
export interface WebserviceSignature {
    parameters: ObjectSchemaNode | null;
    returns: SchemaNode | null;
}

/**
 * Payload sent to the PHP signature extractor.
 */
export interface SignatureExtractionPayload {
    moodlePath: string;
    classFile: string;
    classname: string;
    methodname: string;
}
