import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from
    '@mui/material';

export default function CustomCard({ title, children }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia component="img" height="140" alt="cantona"
                    image="https://e3.365dm.com/24/03/1600x900/skynews-eric-cantona-old-trafford_6493834.jpg?20240318003150.
jpg" />
                <CardContent>
                    <Typography gutterBottom variant="h5"
                        component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {children}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">More Information</Button>
            </CardActions>
        </Card>
    );
}

