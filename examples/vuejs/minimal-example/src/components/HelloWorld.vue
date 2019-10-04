<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <button @click="useCard">Update token</button>

    <div class="container">
      <div id="myPaymentForm"></div>
    </div>
  </div>
</template>

<script>
/* import embedded-form-glue library */
import KRGlue from "@lyracom/embedded-form-glue";
/* define the public key, you should use your personal key */
const publicKey = "69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5";
export default {
  name: "HelloWorld",

  props: {
    msg: String
  },
  data() {
    return {
      noCardToken:
        "01oKuvf_WqQrSvmZBTiU2ziA199eyJhbW91bnQiOjAsImN1cnJlbmN5IjoiRVVSIiwibW9kZSI6IlRFU1QiLCJ2ZXJzaW9uIjozLCJvcmRlcklkIjoiMTIzIiwic2hvcE5hbWUiOiJEZW1vIHNob3AiLCJicmFuZFByaW9yaXR5IjpbIkNCIiwiRS1DQVJURUJMRVVFIiwiTUFTVEVSQ0FSRCIsIk1BRVNUUk8iLCJWSVNBIiwiVklTQV9FTEVDVFJPTiJdLCJjYXRlZ29yaWVzIjp7ImRlYml0Q3JlZGl0Q2FyZHMiOnsiYXBwSWQiOiJjYXJkcyIsInBhcmFtIjpbIkFNRVgiLCJFLUNBUlRFQkxFVUUiLCJNQVNURVJDQVJEIiwiVklTQSIsIlZJU0FfRUxFQ1RST04iLCJDQiJdfX0sImNhcmRzIjp7IkFNRVgiOnsiZmllbGRzIjp7InNlY3VyaXR5Q29kZSI6eyJtYXhMZW5ndGgiOjR9fSwiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn0sIkUtQ0FSVEVCTEVVRSI6eyJjb3B5RnJvbSI6ImNhcmRzLkRFRkFVTFQifSwiTUFTVEVSQ0FSRCI6eyJjb3B5RnJvbSI6ImNhcmRzLkRFRkFVTFQifSwiVklTQSI6eyJjb3B5RnJvbSI6ImNhcmRzLkRFRkFVTFQifSwiVklTQV9FTEVDVFJPTiI6eyJmaWVsZHMiOnsic2VjdXJpdHlDb2RlIjp7InJlcXVpcmVkIjpmYWxzZX19LCJjb3B5RnJvbSI6ImNhcmRzLkRFRkFVTFQifSwiREVGQVVMVCI6eyJmaWVsZHMiOnsicGFuIjp7Im1pbkxlbmd0aCI6MTAsIm1heExlbmd0aCI6MTksInZhbGlkYXRvcnMiOlsiTlVNRVJJQyIsIkxVSE4iXSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6dHJ1ZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX0sImV4cGlyeURhdGUiOnsicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6dHJ1ZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX0sInNlY3VyaXR5Q29kZSI6eyJtaW5MZW5ndGgiOjMsIm1heExlbmd0aCI6MywidmFsaWRhdG9ycyI6WyJOVU1FUklDIl0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOnRydWUsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6dHJ1ZX19fSwiQ0IiOnsiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn19fQe202",
      cardToken:
        "01x5limIixTRuwjFeSU2oBnQ199eyJhbW91bnQiOjUwMCwiY3VycmVuY3kiOiJFVVIiLCJtb2RlIjoiVEVTVCIsInZlcnNpb24iOjMsInNob3BOYW1lIjoiRGVtbyBzaG9wIiwiYnJhbmRQcmlvcml0eSI6WyJCQU5DT05UQUNUIiwiQ0IiLCJFLUNBUlRFQkxFVUUiLCJNQVNURVJDQVJEIiwiTUFFU1RSTyIsIlZJU0EiLCJWSVNBX0VMRUNUUk9OIl0sInRva2VucyI6eyJmb3JjZWQiOnRydWUsImNhcmRzIjpbeyJ0b2tlbiI6Ijg1NjdkNTFiZjEyMTQyNDA4N2JkYjNhMWI0MDRkM2VlIiwiYnJhbmQiOiJDQiIsImZpZWxkcyI6eyJwYW4iOnsidmFsdWUiOiI0OTcwMTBYWFhYWFgwMDE0In0sImV4cGlyeURhdGUiOnsidmFsdWUiOiIxMS8yMDIxIn0sInNlY3VyaXR5Q29kZSI6eyJyZXF1aXJlZCI6ZmFsc2UsImhpZGRlbiI6dHJ1ZX19fV19LCJjYXRlZ29yaWVzIjp7ImRlYml0Q3JlZGl0Q2FyZHMiOnsiYXBwSWQiOiJjYXJkcyIsInBhcmFtIjpbIkFNRVgiLCJWSVNBIiwiTUFFU1RSTyIsIkUtQ0FSVEVCTEVVRSIsIk1BU1RFUkNBUkQiLCJCQU5DT05UQUNUIiwiVklTQV9FTEVDVFJPTiIsIkNCIl19fSwiY2FyZHMiOnsiTUFFU1RSTyI6eyJmaWVsZHMiOnsic2VjdXJpdHlDb2RlIjp7InJlcXVpcmVkIjpmYWxzZX19LCJjb3B5RnJvbSI6ImNhcmRzLkRFRkFVTFQifSwiQU1FWCI6eyJmaWVsZHMiOnsic2VjdXJpdHlDb2RlIjp7Im1heExlbmd0aCI6NH19LCJjb3B5RnJvbSI6ImNhcmRzLkRFRkFVTFQifSwiRS1DQVJURUJMRVVFIjp7ImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9LCJNQVNURVJDQVJEIjp7ImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9LCJWSVNBIjp7ImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9LCJCQU5DT05UQUNUIjp7ImZpZWxkcyI6eyJzZWN1cml0eUNvZGUiOnsicmVxdWlyZWQiOmZhbHNlLCJoaWRkZW4iOnRydWV9fSwiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn0sIlZJU0FfRUxFQ1RST04iOnsiZmllbGRzIjp7InNlY3VyaXR5Q29kZSI6eyJyZXF1aXJlZCI6ZmFsc2V9fSwiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn0sIkRFRkFVTFQiOnsiZmllbGRzIjp7InBhbiI6eyJtaW5MZW5ndGgiOjEwLCJtYXhMZW5ndGgiOjE5LCJ2YWxpZGF0b3JzIjpbIk5VTUVSSUMiLCJMVUhOIl0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOnRydWUsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJleHBpcnlEYXRlIjp7InJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOnRydWUsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJzZWN1cml0eUNvZGUiOnsibWluTGVuZ3RoIjozLCJtYXhMZW5ndGgiOjMsInZhbGlkYXRvcnMiOlsiTlVNRVJJQyJdLCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjp0cnVlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOnRydWV9fX0sIkNCIjp7ImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9fX0fa02"
    };
  },
  mounted() {
    this.buildForm(this.noCardToken);
  },
  methods: {
    useCard() {
      this.buildForm(this.cardToken);
    },
    buildForm(token) {
      KRGlue.loadLibrary(
        "http://krypton.local",
        publicKey
      ) /* Load the remote library */
        .then(({ KR }) =>
          KR.setFormConfig({
            /* set the minimal configuration */
            formToken: token,
            "kr-language": "en-US" /* to update initialization parameter */
          })
        )
        .then(({ KR }) =>
          KR.addForm("#myPaymentForm")
        ) /* create a payment form */
        .then(({ KR, result }) =>
          KR.showForm(result.formId)
        ); /* show the payment form */
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>