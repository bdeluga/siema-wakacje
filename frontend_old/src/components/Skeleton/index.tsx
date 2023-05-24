type Props = {
  count?: number;
};

export const HotelSkeleton = ({ count = 1 }: Props) => {
  return (
    <>
      {[...Array(count).keys()].map((_, idx) => (
        <div className="flex animate-pulse p-4" key={idx}>
          <div className="mr-4 flex h-full items-center justify-center">
            <div className="avatar">
              <div className="w-32 rounded bg-base-300" />
            </div>
          </div>
          <div className="form-control w-full">
            <div className="my-2 h-8 w-44 bg-base-300" />
            <div className="mt-2 h-5 w-11/12 bg-base-300" />
            <div className="mt-2 h-5 w-1/2 bg-base-300" />
          </div>
          <div className="form-control h-full justify-between">
            <div className="h-8 w-28 bg-base-300" />
            <div className="h-12 w-28 bg-base-300" />
          </div>
        </div>
      ))}
    </>
  );
};

export const CitySkeleton = ({ count = 1 }: Props) => {
  return (
    <>
      {[...Array(count).keys()].map((_, idx) => (
        <div className="btn animate-pulse border-none bg-base-300" key={idx} />
      ))}
    </>
  );
};
