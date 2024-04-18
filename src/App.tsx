import { ChangeEvent, FormEvent, useState } from 'react';
import ProductCard from './components/ProductCard';
import Modal from './components/ui/Modal';
import { productList, formInputsList, colors, categories } from './data';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import { IProduct } from './interfaces';
import { productValidation } from './validation';
import ErrorMessage from './components/ErrorMessage';
import { v4 as uuid } from 'uuid';
import CircleColor from './components/CircleColor';
import Select from './components/ui/Select';
import { ProductNameTypes } from './types';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const defaultProductObj = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: { name: '', imageURL: '' },
  };
  /*======== State ==========*/
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: '',
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [tempEditColors, setTempEditColors] = useState<string[]>(productToEdit.colors);
  /*======== Handlers ==========*/
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });

    setErrors({
      ...errors,
      [name]: '',
      colors: '',
    });
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, description, imageURL, price } = product;

    const errorsObj = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: tempColors,
    });
    const hasErrorMsg = Object.values(errorsObj).some((value) => value.length > 0);

    if (hasErrorMsg) {
      setErrors(errorsObj);
      return;
    }

    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColors, category: selectedCategory },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    setErrors({
      title: '',
      description: '',
      imageURL: '',
      price: '',
      colors: '',
    });
    toast('Product Created Successfully', {
      icon: '🟢',
    });
    closeModal();
  };
  const onCancel = () => {
    setProduct(defaultProductObj);
    setTempColors([]);
    closeModal();
  };
  // ======================================================================

  const openEditModal = () => {
    setIsOpenEditModal(true);
  };
  const closeEditModal = () => {
    setIsOpenEditModal(false);
  };

  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  const submitEditHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, description, imageURL, price } = productToEdit;

    const errorsObj = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: tempEditColors,
    });
    const hasErrorMsg = Object.values(errorsObj).some((value) => value.length > 0);

    if (hasErrorMsg) {
      setErrors(errorsObj);
      return;
    }

    const updatedProduct = [...products];
    updatedProduct[productToEditIdx] = {
      ...productToEdit,
      colors: tempEditColors,
    };
    setProducts(updatedProduct);
    setProduct(defaultProductObj);
    setTempColors([]);
    setErrors({
      title: '',
      description: '',
      imageURL: '',
      price: '',
      colors: '',
    });
    toast('product changed successfully', {
      icon: 'ℹ',
    });
    closeEditModal();
  };

  const onEditCancel = () => {
    setProduct(defaultProductObj);
    setTempColors([]);
    closeEditModal();
  };
  // ///////////////////////////

  const openConfirmModal = () => {
    setIsOpenConfirmModal(true);
  };
  const closeConfirmModal = () => {
    setIsOpenConfirmModal(false);
  };
  const deleteHandler = () => {
    setProducts((prev) => prev.filter((el) => el.id !== productToEdit.id));
    toast('Product Deleted Successfully', {
      icon: '💥',
    });
    closeConfirmModal();
  };
  /*======== Render ==========*/
  const renderProductCards = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
      setTempEditColors={setTempEditColors}
      openConfirmModal={openConfirmModal}
    />
  ));

  const renderFormInputs = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-[2px] font-medium text-gray-700 text-sm">
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((el) => el !== color));
        } else {
          setTempColors((prev) => [...prev, color]);
        }
      }}
    />
  ));
  const renderProductToEditColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempEditColors.includes(color)) {
          setTempEditColors((prev) => prev.filter((el) => el !== color));
        } else {
          setTempEditColors((prev) => [...prev, color]);
        }
      }}
    />
  ));
  const renderProductEditWithErrorMsg = (id: string, label: string, name: ProductNameTypes) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-[2px] font-medium text-gray-700 text-sm">
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  /*======== App ==========*/

  return (
    <main className="container flex flex-col mx-auto">
      <Button
        className="hover:bg-indigo-800 max-w-sm m-2 mx-auto bg-indigo-700 rounded-md"
        onClick={openModal}
      >
        Add
      </Button>

      <div className="md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid grid-cols-1 gap-2 p-2 m-5 rounded-md">
        {renderProductCards}
      </div>

      {/* Add Product Modal */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add A New Product">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputs}

          <div className="flex flex-wrap items-center space-x-1">{renderProductColors}</div>
          {errors.colors && <ErrorMessage msg={errors.colors} />}

          <div className="flex flex-wrap items-center space-x-1">
            {tempColors.map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className="p1 mb-1 mr-1 text-xs text-white rounded-md"
              >
                {color}
              </span>
            ))}
          </div>
          <Select selected={selectedCategory} setSelected={setSelectedCategory} />

          <div className="flex items-center space-x-3">
            <Button className="hover:bg-indigo-800 bg-indigo-700">Submit</Button>
            <Button className="hover:bg-gray-400 bg-gray-500" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal isOpen={isOpenEditModal} closeModal={closeEditModal} title="Edit Product">
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg('title', 'Product Title', 'title')}
          {renderProductEditWithErrorMsg('description', 'Product Description', 'description')}
          {renderProductEditWithErrorMsg('imageURL', 'Product Image URL', 'imageURL')}
          {renderProductEditWithErrorMsg('price', 'Product Price', 'price')}

          <Select
            selected={productToEdit.category}
            setSelected={(value) => {
              setProductToEdit({ ...productToEdit, category: value });
            }}
          />
          <div className="flex flex-wrap items-center space-x-1">{renderProductToEditColors}</div>
          <div className="flex flex-wrap items-center space-x-1">
            {tempEditColors.map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className="p1 mb-1 mr-1 text-xs text-white rounded-md"
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button className="hover:bg-indigo-800 bg-indigo-700">Submit</Button>
            <Button className="hover:bg-gray-400 bg-gray-500" onClick={onEditCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* Delete Product Confirm Modal */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your store?"
        description="Warning: You are about to delete a product from your store. This action is irreversible and will permanently remove the product from your inventory. If you're sure about this decision, click 'Submit'. If you'd like to review your decision, please click 'Cancel' to close this window and return to your store."
      >
        <div className="flex items-center space-x-2">
          <Button className="hover:bg-indigo-800 bg-red-700" onClick={deleteHandler}>
            Yes, confirm
          </Button>
          <Button className="hover:bg-gray-400 bg-gray-500" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster />
    </main>
  );
};

export default App;
