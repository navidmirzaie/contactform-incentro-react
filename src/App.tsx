import "./styles.css";
import { Input } from "./components/Input.component";
import { InputRow } from "./components/InputRow.component";
import { ChangeEvent, FormEvent, useState } from "react";
import { zipcodeApiResponse } from "./types/zipcodeApiResponse.type";

export default function App() {
  let [naw, setNaw] = useState({
    initial: "",
    infix: "",
    lastname: "",
    zipcode: "",
    street: "",
    city: "",
    housenumber: "",
    email: ""
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };

  async function getAdress(
    zipcode: string,
    housenumber: string
  ): Promise<zipcodeApiResponse> {
    let request;
    try {
      request = await fetch(
        `https://postcode.tech/api/v1/postcode?postcode=${zipcode}&number=${housenumber}`,
        {
          headers: {
            Authorization: "Bearer 56c91139-6b7d-4de7-92e3-9cf2b29353a5"
          }
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      const response: zipcodeApiResponse = await request?.json();
      return response;
    }
  }

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNaw({
      ...naw,
      [event.target.name]: value
    });
  };

  const validateZipcode = (input: HTMLInputElement) => {
    const dutchZipCode = /^[1-9][0-9]{3}?(?!sa|sd|ss)[a-zA-Z]{2}$/g;

    if (dutchZipCode.test(input.value)) {
      setNaw({
        ...naw,
        zipcode: input.value
      });
    } else {
      alert("Postcode is niet valide");
    }
  };

  const validateInputField = (input: HTMLInputElement) => {
    return input.hasAttribute("required") && input.value === ""
      ? input.classList.add("invalid")
      : "";
  };

  const blurHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputField = event.target;
    if (inputField.name === "zipcode") {
      validateZipcode(inputField);
    }

    //call API when zipcode and housenumber are both filled in
    if (inputField.name === "housenumber") {
      const request = await getAdress(naw.zipcode, naw.housenumber);
      const { street, city } = request;
      setNaw({
        ...naw,
        street: street,
        city: city
      });
    }

    validateInputField(inputField);
  };

  return (
    <div className="App">
      <main>
        <section className="form">
          <h3>Welkom Incentronaut</h3>
          <br />
          <form action="#" method="post" onSubmit={handleSubmit}>
            <InputRow>
              <Input
                label="Voorletter"
                name="initial"
                value={naw.initial}
                onChange={changeHandler}
                onBlur={blurHandler}
                required
              />
              <Input
                label="Tussenvoegsel"
                name="infix"
                value={naw.infix}
                onChange={changeHandler}
                onBlur={blurHandler}
              />
            </InputRow>
            <InputRow>
              <Input
                name="lastname"
                label="lastname"
                onChange={changeHandler}
                onBlur={blurHandler}
                required
              />
            </InputRow>
            <InputRow>
              <Input
                name="zipcode"
                label="Postcode"
                maxLength={6}
                onChange={changeHandler}
                onBlur={blurHandler}
                required
              />
              <Input
                name="housenumber"
                label="Huisnummer"
                onChange={changeHandler}
                onBlur={blurHandler}
              />
            </InputRow>
            <InputRow>
              <Input
                name="streetname"
                label="straatnaam"
                value={naw.street}
                readOnly
              />
            </InputRow>
            <InputRow>
              <Input name="city" label="stad" value={naw.city} readOnly />
            </InputRow>
            <InputRow>
              <Input
                name="email"
                label="email"
                onChange={changeHandler}
                value={naw.email}
                required
              />
            </InputRow>
            <input type="submit" name="Submit" />
          </form>
        </section>
      </main>
    </div>
  );
}
