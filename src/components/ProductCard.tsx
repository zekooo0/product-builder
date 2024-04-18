import { txtSlicer } from '../functions';
import { IProduct } from '../interfaces';
import Image from './Image';
import Button from './ui/Button';
import CircleColor from './CircleColor';

interface Iprops {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  idx: number;
  setProductToEditIdx: (value: number) => void;
  setTempEditColors: (value: string[]) => void;
  openConfirmModal: () => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  setProductToEditIdx,
  idx,
  setTempEditColors,
  openConfirmModal,
}: Iprops) => {
  const { category, colors, description, imageURL, price, title } = product;
  const onEdit = () => {
    setProductToEdit(product);
    setProductToEditIdx(idx);
    setTempEditColors(colors);
  };
  const onRemove = () => {
    setProductToEdit(product);

    openConfirmModal();
  };
  return (
    <div className="md:mx-0 flex flex-col justify-between max-w-sm p-2 mx-auto border rounded-md">
      <Image imageUrl={imageURL} alt={title} className="mb-2 rounded-md" />

      <h3>{title}</h3>

      <p>{txtSlicer(description)}</p>

      <div className="flex items-center my-4 space-x-2">
        {colors.length > 0 && colors.map((color) => <CircleColor key={color} color={color} />)}
        {colors.length < 1 && <p>No colors avilable</p>}
      </div>

      <div className="flex items-center justify-between space-x-2">
        <span className="text-2xl font-medium text-indigo-800">
          {Number(price).toLocaleString()}$
        </span>
        <Image
          imageUrl={category.imageURL}
          alt={category.name}
          className="object-cover w-10 h-10 rounded-full"
        />
      </div>

      <div className="flex items-center mt-5 mb-0 space-x-2 text-white">
        <Button
          className="hover:bg-indigo-800 bg-indigo-700"
          onClick={() => {
            onEdit();
            openEditModal();
          }}
        >
          Edit
        </Button>
        <Button className="bg-red-700" onClick={onRemove}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
