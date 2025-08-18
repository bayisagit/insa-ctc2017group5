import Counter from "./Counter";

 function ProductLayout({ children }: { children: React.ReactNode }) {

  return (
    <div >
      


        <Counter />
      <div >{children}</div>
    </div>
  );
}

export default ProductLayout;