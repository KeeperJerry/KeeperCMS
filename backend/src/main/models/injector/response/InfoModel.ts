export default interface InfoModel {
    meta : Meta;
    skinDomains : string[];
    signaturePublickey : string;
}

interface Meta {
    serverName : string;
    implementationName : string;
    implementationVersion : string;
    links : MetaLinks;
}

interface MetaLinks {
    homepage : string;
    register : string;
}