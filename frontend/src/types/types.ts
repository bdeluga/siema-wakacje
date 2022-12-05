export type Error = {
msg:string;
}

type responseCity={
    name:string,
    country:string,
    iso:string
}

export type City={
    metainf:{
        count:number
    },
    data:responseCity[]
}