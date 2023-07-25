import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Button, CardOverflow, Typography } from "@mui/joy";
import { remove } from "../redux/cardSlice";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
function Favourite() {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.cart);

  const handleRemove = (productId: any) => {
    dispatch(remove(productId));
  };

  return (
    <div>
      {products.map((product: any) => (
        <Card sx={{ minWidth: 275 }} key={product.index}>
          <Card
            sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}
            key={product.id}
          >
            <CardContent>
              <Typography level="body3">{product.name}</Typography>

              <Typography level="body2"></Typography>
            </CardContent>
            <CardOverflow>
              <Button
                variant="solid"
                color="danger"
                size="lg"
                onClick={() => handleRemove(product.id)}
              >
                <ThumbDownAltIcon/>
              </Button>
            </CardOverflow>
          </Card>
        </Card>
      ))}
    </div>
  );
}

export default Favourite;
