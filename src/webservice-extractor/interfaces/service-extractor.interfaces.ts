export interface MoodleService {
    name: string;
    classname: string;
    type?: string | null;
    // if methodname is null or not exists default is 'execute'
    methodname: string;
    classpath?: string | null;
    description?: string | null;
}
