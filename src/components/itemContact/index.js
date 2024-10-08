import { IconButton, Tooltip } from "@mui/material";
import "./styles.css";
import { Delete, Edit } from "@mui/icons-material";
import { red } from "@mui/material/colors";

const ItemContact = ({ phone, name, selected, onClick, deleteItem }) => {
  return (
    <div
      className="item"
      style={{ backgroundColor: selected ? 'beige' : 'transparent'}}
      onClick={onClick}
    >
      <span>
        <b className="limited-text">Nome: {name}</b> Telefone: {phone}
      </span>

      <div className="actions">
        <Tooltip title="Delete Contact" arrow placement="top">
          <IconButton aria-label="Delete" color="primary" onClick={deleteItem}>
            <Delete sx={{ color: red[500] }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Contact" arrow placement="top">
          <IconButton aria-label="Edit" color="primary">
            <Edit />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default ItemContact;
