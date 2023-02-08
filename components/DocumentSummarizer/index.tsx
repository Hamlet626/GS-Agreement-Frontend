import { Grid, Typography } from "@mui/material";

export default function DocumentSummarizer() {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={6}>
        <Typography
          variant="h6"
          sx={{
            py: 2,
            borderBottom: "1px solid #3f3f33",
            fontWeight: "bolder",
          }}
        >
          Original Document
        </Typography>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
            vulputate mauris. Donec suscipit ultricies suscipit. Ut vitae sapien
            eu tortor rhoncus convallis. Donec sit amet velit sed libero rutrum
            tristique ut non sapien. Vestibulum ante ipsum primis in faucibus
            orci luctus et ultrices posuere cubilia curae; Proin id neque
            dictum, egestas odio id, placerat dui. Aenean tincidunt lorem enim,
            non fermentum lorem tincidunt vitae. Duis semper risus nec ligula
            hendrerit, at semper justo rhoncus. Quisque eget vestibulum diam.
            Suspendisse blandit vestibulum tortor ac rhoncus.
          </p>
          <p>
            Integer blandit, mauris sed scelerisque cursus, leo enim accumsan
            nulla, non sollicitudin metus massa non arcu. Maecenas pretium
            fermentum lacus nec ornare. Integer iaculis tincidunt enim, id
            porttitor augue faucibus non. Integer molestie nisl a pharetra
            ullamcorper. Integer blandit ligula at ipsum aliquet dictum. Vivamus
            pulvinar nibh nec maximus viverra. Aenean nec ligula in leo sodales
            fermentum. Fusce faucibus commodo fermentum. Duis eget ipsum
            ultrices, facilisis felis vel, sagittis orci. In in fermentum lorem.
            Sed pretium consectetur purus sit amet dictum. Suspendisse est arcu,
            posuere eu erat quis, porttitor luctus eros.
          </p>
          <p>
            Cras nec urna eget lorem laoreet elementum sit amet dignissim neque.
            Duis ultrices est id elit dapibus blandit. Quisque auctor diam a
            ultrices auctor. Quisque venenatis, lacus ac interdum blandit,
            tortor nibh blandit nisi, consectetur consectetur tortor elit et
            turpis. Nam sollicitudin justo eget dignissim tincidunt. Phasellus
            sed vulputate nisl. In hac habitasse platea dictumst. Mauris cursus
            ultricies fermentum. Maecenas sem ex, cursus sed blandit nec,
            commodo non mi. Mauris a neque porttitor, finibus dui eu, porta leo.
          </p>
          <p>
            Aliquam semper, erat sit amet lacinia rutrum, libero lectus
            ullamcorper nibh, sit amet fermentum odio erat eu leo. Praesent orci
            leo, imperdiet a sem ac, vulputate iaculis felis. Donec euismod erat
            purus, vitae maximus ligula tempor sed. Pellentesque at faucibus
            urna, eu iaculis augue. In hac habitasse platea dictumst. Aliquam in
            ligula quis nulla semper semper eget sit amet elit. Fusce vitae
            rhoncus risus, sed dictum velit. Quisque eu sapien fringilla,
            condimentum augue et, sodales nisl. Pellentesque in sagittis ante,
            at convallis nisi. Interdum et malesuada fames ac ante ipsum primis
            in faucibus. Sed quis mattis felis.
          </p>
          <p>
            Nunc et erat nulla. Duis rhoncus semper dolor. Donec lorem neque,
            tincidunt in hendrerit sit amet, ornare sit amet ligula. Phasellus
            iaculis dolor eu risus varius tristique et in quam. Sed erat nunc,
            faucibus a convallis at, varius non sem. Proin malesuada massa sed
            mi finibus ultricies. Nulla in neque posuere, cursus dolor eget,
            sollicitudin lacus. Proin viverra risus at nunc tincidunt, venenatis
            tincidunt urna pretium. Duis at nunc eu nisl tincidunt scelerisque.
            Vivamus suscipit nisi erat, ac accumsan odio dapibus quis. Nam massa
            nibh, commodo in laoreet in, pretium a ipsum. Interdum et malesuada
            fames ac ante ipsum primis in faucibus. Pellentesque et est et neque
            ultricies euismod. Morbi gravida mi lobortis odio scelerisque, vitae
            auctor nisl ultrices.
          </p>
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography
          variant="h6"
          sx={{
            py: 2,
            borderBottom: "1px solid #3f3f33",
            fontWeight: "bolder",
          }}
        >
          Summarized Doc
        </Typography>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
          vulputate mauris.
        </p>
        <p>
          Integer blandit, mauris sed scelerisque cursus, leo enim accumsan
          nulla, non sollicitudin metus massa non arcu.
        </p>
      </Grid>
    </Grid>
  );
}
