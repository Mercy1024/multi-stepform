import { useState } from "react";
import bg_sidebar_mobile from "./assets/images/bg-sidebar-mobile.svg";
import bg_sidebar_desktop from "./assets/images/bg-sidebar-desktop.svg";
import arcade from "./assets/images/icon-arcade.svg";
import advanced from "./assets/images/icon-advanced.svg";
import pro from "./assets/images/icon-pro.svg";
import icon_thanks from "./assets/images/icon-thank-you.svg";

const Tabs = [1, 2, 3, 4, 5];
const PLANS = [
  {
    planType: "Arcade",
    img: arcade,
    monthlyBill: "$9/mo",
    yearlyBill: "$90/yr",
  },
  {
    planType: "Advanced",
    img: advanced,
    monthlyBill: "$12/mo",
    yearlyBill: "$120/yr",
  },
  {
    planType: "Pro",
    img: pro,
    monthlyBill: "$15/mo",
    yearlyBill: "$150/yr",
  },
];

const add_Ons = [
  {
    addonName: "Online service",
    access: "Access to multiplayer games",
    billmonthly: "1/mo",
    billyearly: "10/yr",
  },
  {
    addonName: "Larger storage",
    access: "Extra 1TB of cloud save",
    billmonthly: "2/mo",
    billyearly: "20/yr",
  },
  {
    addonName: "Customizable profile",
    access: "Custom theme on your profile",
    billmonthly: "2/mo",
    billyearly: "20/yr",
  },
];
export default function App() {
  const [active, setActive] = useState(1);
  const [nameInput, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [monthly, setMonthly] = useState(true);

  const yearly = !monthly;
  const formData = {
    nameInput,
    email,
    phone,
    yearly,
    monthly,
    plan,
    checked,
  };

  const nameRegex = /^(?!\s*$).+/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(?:\+234)?[0-9]{11}$/;
  function onClickNext() {
    const newErrors = {};

    if (!nameRegex.test(nameInput)) {
      newErrors.name = "Invalid name";
    }

    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (!phoneRegex.test(phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);

    console.log(formData);
    if (active === 1 || active === 4) {
      // Only proceed if there are no validation errors
      if (Object.keys(newErrors).length === 0 && active <= 4) {
        setActive((prevActive) => prevActive + 1);
      }
    } else if (active === 2 && formData.plan) {
      setActive((prevActive) => prevActive + 1);
    } else if (active === 3 && formData.checked.length) {
      setActive((prevActive) => prevActive + 1);
    }
  }

  function onClickBack() {
    if (active >= 2) {
      setActive(() => active - 1);
    }
  }
  return (
    <div className="container">
      <div className="pattern">
        <img className="img-mobile" src={bg_sidebar_mobile} alt="bg-mobile" />
        <img
          className="img-desktop"
          src={bg_sidebar_desktop}
          alt="bg-desktop"
        />
        <div className="numbers">
          {Tabs.map((tab, i) => (
            <span className={active === tab ? "active" : ""} key={i}>
              {tab}
            </span>
          ))}
        </div>
      </div>

      {active === 1 ? (
        <Form_Container
          nameInput={nameInput}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          errors={errors}
        />
      ) : active === 2 ? (
        <Plan_Container
          monthly={monthly}
          setMonthly={setMonthly}
          setPlan={setPlan}
        />
      ) : active === 3 ? (
        <Add_Ons
          monthly={monthly}
          setMonthly={setMonthly}
          checked={checked}
          setChecked={setChecked}
        />
      ) : active === 4 ? (
        <Summary
          checked={checked}
          plan={plan}
          monthly={monthly}
          setActive={setActive}
          PLANS={PLANS}
        />
      ) : (
        <Thank_You />
      )}

      <div className="footer">
        {active > 1 ? (
          <button onClick={() => onClickBack()} className="back">
            Go Back
          </button>
        ) : (
          ""
        )}

        <button onClick={() => onClickNext()} className="next">
          Next Step
        </button>
      </div>
    </div>
  );
}

function Form_Container({
  nameInput,
  setName,
  email,
  phone,
  setEmail,
  setPhone,
  errors,
}) {
  return (
    <div className="form_Container container_Comp">
      <header>
        <h1>Personal info</h1>
        <p>Please provide your nameInput, email address and phone number.</p>
      </header>

      <form>
        <div className="name inputField">
          <div className="input_msgs">
            <label>Name</label>
            {errors.name ? <span className="error ">{errors.name}</span> : ""}
          </div>

          <input
            className={errors.name ? "errorBorder" : ""}
            value={nameInput}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="e.g. Stephen King"
            required
          />
        </div>

        <div className="Email inputField">
          <div className="input_msgs">
            <label>Email Address</label>
            {errors.email ? <span className="error ">{errors.email}</span> : ""}
          </div>
          <input
            className={errors.email ? "errorBorder" : ""}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            required
          />
        </div>

        <div className="phone inputField">
          <div className="input_msgs">
            <label>Phone Number</label>
            {errors.phone ? <span className="error ">{errors.phone}</span> : ""}
          </div>

          <input
            className={errors.phone ? "errorBorder" : ""}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="e.g. +1 234 567 890"
            pattern="[0-9]{10}"
            required
          />
        </div>
      </form>
    </div>
  );
}

function Plan_Container({ monthly, setMonthly, setPlan }) {
  const [activePlan, setActivePlan] = useState(null);

  function OnclickPlan(index, planName) {
    setActivePlan(index);
    setPlan(planName);
  }

  return (
    <div className="plan_container container_Comp">
      <header>
        <h1>Select your plan</h1>
        <p>You have the option of monthly or yearly billing.</p>
      </header>

      {PLANS.map((plan, index) => (
        <div
          onClick={() => OnclickPlan(index, plan.planType)}
          id={index}
          key={index}
          className={`plans ${activePlan === index ? "clickedPlan" : ""}`}
        >
          <div className="icon">
            <img src={plan.img} alt="icon" />
          </div>

          <div className="plan_Details">
            <span className="plan_name">{plan.planType}</span>
            <span className="amount">
              {monthly ? plan.monthlyBill : plan.yearlyBill}
            </span>
            {monthly ? "" : <span className="freebie">2 months free</span>}
          </div>
        </div>
      ))}

      <div className="toggle_Section">
        <span className="month planOptionActive">Monthly</span>

        <div className="toggle-switch">
          <input
            onClick={() => setMonthly(!monthly)}
            className="toggle-input"
            id="toggle"
            type="checkbox"
          />
          <label className="toggle-label" htmlFor="toggle"></label>
        </div>

        <span className="year planOptionDefault">Yearly</span>
      </div>
    </div>
  );
}

function Add_Ons({ monthly, checked, setChecked }) {
  function OnclickAddon(addonName) {
    if (checked.includes(addonName)) {
      setChecked(checked.filter((addon) => addon != addonName));
    } else {
      setChecked([...checked, addonName]);
    }
  }
  return (
    <div className="form_Container container_Comp">
      <header>
        <h1>Pick add-ons</h1>
        <p>Add-ons help enhance your gaming experience.</p>
      </header>

      <div className="add_ons_Comp">
        {add_Ons.map((addon, index) => (
          <div
            onClick={() => OnclickAddon(addon.addonName)}
            key={index}
            className={`add_ons_Card ${
              checked.includes(addon.addonName) ? "clickedAddon" : ""
            }`}
          >
            <div className="add_ons_check">
              <input
                checked={checked.includes(addon.addonName)}
                readOnly
                className="checkBox"
                type="checkbox"
              />
              <div className="add_ons_name">
                <span className="name">{addon.addonName}</span>
                <span className="feature">{addon.access}</span>
              </div>
            </div>
            <span className="bill_perMonth">
              {monthly ? `+${addon.billmonthly}` : `+${addon.billyearly}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Summary({ monthly, setActive, plan, checked, PLANS }) {
  const planDetails = PLANS.filter((value) => value.planType === plan);

 
  

  return (
    <div className="form_Container container_Comp">
      <header>
        <h1>Finishing up</h1>
        <p>Double-check everything looks OK before confirming</p>
      </header>

      <div className="summary">
        <div className="summary_details">
          <div className="plan_sum">
            <div className="plan_name">
              <span className="na_me">
                {plan} ({monthly ? "Monthly" : "Yearly"})
              </span>
              <span onClick={() => setActive(2)} className="change_plan">
                Change
              </span>
            </div>

            <span className="plan_bill">
              {monthly ? planDetails[0].monthlyBill : planDetails[0].yearlyBill}
            </span>
          </div>
          <div className="add-on_details">
            {checked.map((sumAddon, index) => (
              <div key={index} className="add-on_name">
                <span className="add-on_1">{sumAddon}</span>
                <span className="add-on_price">
                  {monthly
                    ? sumAddon === "Online service"
                      ? "+$1/mo"
                      : sumAddon === "Larger storage"
                      ? "+2/mo"
                      : sumAddon === "Customizable profile"
                      ? "+2/mo"
                      : ""
                    : sumAddon === "Online service"
                    ? "+$10/yr"
                    : sumAddon === "Larger storage"
                    ? "+20/yr"
                    : sumAddon === "Customizable profile"
                    ? "+20/yr"
                    : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="total">
          <span className="total_per">Total (per month)</span>
          <span className="total_bill">{monthly ? "$12/mo" : "$120/yr"}</span>
        </div>
      </div>
    </div>
  );
}

function Thank_You() {
  return (
    <div className="thanks">
      <img src={icon_thanks} alt="icon-thankYou" />

      <h1>Thank you! </h1>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p>
    </div>
  );
}
