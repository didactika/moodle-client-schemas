export interface ResolvedClass {
    file: string;
    classname: string;
    resolution: 'classpath' | 'psr4' | 'legacy';
}
