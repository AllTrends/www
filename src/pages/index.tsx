export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <main className="container mx-auto mb-8 mt-4 grid w-full grow grid-cols-4 gap-4">
      <div className="col-span-3 ring ring-red-700">
        <h1></h1>
      </div>
      <div className="col-span-1 ring ring-green-700"></div>
    </main>
  );
}
