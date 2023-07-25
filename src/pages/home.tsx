import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Button, CardOverflow, Typography, Modal } from "@mui/joy"; // Import Modal component
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/cardSlice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CloseIcon from "@mui/icons-material/Close";

interface Product {
  index: any;
  name: string;
}

function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSpell, setSelectedSpell] = useState<any>(null);
  const itemsPerPage = 50;
  const [isLoading, setIsLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);

  const inputValue = useSelector((state: any) => state.input?.inputValue);
  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://www.dnd5eapi.co/api/spells");
      setProducts(res.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredItems(currentItems);
  }, [currentItems]);

  const filterItems = () => {
    if (!inputValue) {
      setFilteredItems(currentItems);
    } else {
      const filtered = currentItems.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  // let timer:any ="";
  // useEffect(() => {
  //   if (timer) clearTimeout(timer);
  //   timer = setTimeout(() => {
  //     timer = null;
  //     filterItems();
  //   }, 1000);

  // }, [inputValue]);
  useEffect(() => {
    filterItems()
  }, [inputValue]);

  const fetchProductsName = async () => {
    try {
      if (selectedProduct) {
        const res = await axios.get(
          `https://www.dnd5eapi.co/api/spells/${selectedProduct.index}`
        );
        setSelectedSpell(res.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductsName();
  }, [selectedProduct]);

  const handleAdd = (product: any) => {
    dispatch(add(product));
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const list = products.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(list);
  }, [currentPage, products]);
  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (product: Product | null) => {
    setSelectedProduct(product);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ModalContent = () => {
    if (!selectedProduct) return null;

    return (
      <div className="modal_container">
        <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
          <CloseIcon onClick={() => setIsModalOpen(false)} />
          <CardContent>
            <Typography level="body3">{selectedSpell?.name}</Typography>
            <Typography level="body3">{selectedSpell?.desc}</Typography>
            <Typography level="body3">{selectedSpell?.higher_level}</Typography>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              margin: "1rem",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {filteredItems.map((product: Product) => (
              <Card sx={{ minWidth: 155 }} key={product.index}>
                <Card
                  sx={{ width: 150, maxWidth: "100%", boxShadow: "lg" }}
                  key={product.index}
                >
                  <CardContent>
                    <Typography level="body3">{product.name}</Typography>
                    <Typography level="body2"></Typography>
                  </CardContent>
                  <CardOverflow>
                    <Button
                      aria-label="Like"
                      variant="outlined"
                      color="neutral"
                      onClick={() => handleAdd(product)}
                    >
                      {" "}
                      <ThumbUpIcon />
                    </Button>
                    <Button
                      aria-label="Like"
                      variant="outlined"
                      color="neutral"
                      onClick={() => openModal(product)}
                    >
                      View
                    </Button>
                  </CardOverflow>
                </Card>
              </Card>
            ))}
          </div>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="pagination_container"
          >
            {pageNumbers.map((pageNumber) => (
              <Button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Button>
            ))}
          </div>

          {/* Modal */}
          <Modal open={isModalOpen} onClose={closeModal}>
            <ModalContent />
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Home;
