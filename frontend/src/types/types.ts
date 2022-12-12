export type Error = {
msg:string;
}

type responseCity={
    name:string
    country:string
    iso:string
    lat:number
    lng:number
}

export type City={
    metainf:{
        count:number
    },
    data:responseCity[]
}