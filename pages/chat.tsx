import {AppBar, Card, CardContent, Container, IconButton, Toolbar, Typography} from "@mui/material";
import DocumentUpload from "../components/DocumentUpload";
import DraftEditor from "../components/DraftEditor";
import {useSelector} from "react-redux";
import {selectDocumentTitle} from "../store/docSections";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useRouter} from "next/router";
import ChatBody from "../components/ChatBody";
import {styled} from "@mui/material/styles";

const ChatAppBar = styled(AppBar)({
    marginBottom: "1rem",
});

export default function Chat() {
    const documentTitle = useSelector(selectDocumentTitle);
    const router = useRouter();

    return (<>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="back to summarization"
                        sx={{mr: 2}}
                        onClick={router.back}
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Inquire about {documentTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
            <ChatBody />
        </>
        ///this is surface container 2, for which we could use elevation 12-15.9, see note1
        // <Card elevation={12}>
        //     <CardContent>
        //         <DocumentUpload />
        //         <Typography
        //             variant="h5"
        //             align="center"
        //             sx={{
        //                 margin: "2rem 0",
        //             }}
        //         >
        //             Or
        //         </Typography>
        //         <DraftEditor />
        //     </CardContent>
        // </Card>
    );

}