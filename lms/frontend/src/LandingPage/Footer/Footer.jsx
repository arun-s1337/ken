
import { Links, CONTACT_US, SOCIAL } from "../../utils/Links";
import { NavLink } from "react-router";

export default function Footer() {
  
  return (
    <>
      <div className="container-fluid py-4 " style={{ backgroundColor: "#001040" }}>
        <div className="row text-white">
          {/* Logo */}
          <div className="col-12 col-md-3 d-flex justify-content-center align-items-center mb-4 mb-md-0">
            <img src="/image 66.png" alt="Logo" className="img-fluid" style={{ maxWidth: "210px" }} />
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h5 className="fw-bold" style={{ color: "#ffa200" }}>Quick Links</h5>
            {Links.map((link) => (
              <div key={link.id}>
                {link.name === "My Spine Coach" ? (
                  <NavLink
                    to="/myspinecoach"
                    className="text-white text-decoration-none d-block my-1"
                   
                  >
                    {link.name}
                  </NavLink>
                ) : (
                  <NavLink  to={link.link} className="text-white text-decoration-none d-block my-1">
                    {link.name}
                  </NavLink>
                )}
              </div>
))}

          </div>

          {/* Contact Us */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h5 className="fw-bold" style={{ color: "#ffa200" }}>Contact Us</h5>
            {CONTACT_US.map((item) => {
              const Icon = item.icon;
              const value = item.value;
              const isAddress = item.type === "address";
              const isEmail = item.type === "mail";
              const isPhone = item.type === "phone";

              const href = isEmail
                ? `mailto:${value}`
                : isPhone
                  ? `tel:${value.replace(/\D/g, "")}`
                  : isAddress
                    ? `https://maps.google.com/?q=${encodeURIComponent(value)}`
                    : "#";

              return (
                <div key={item.id} className="mb-2">
                  {isAddress ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none d-block my-1">
                      <div>{value.split(",")[0]},</div>
                      <div>{value.split(",")[1]?.trim()} {value.split(",")[2]?.trim()}</div>
                    </a>
                  ) : (
                    <a href={href} className="text-white text-decoration-none d-flex align-items-center">
                      {Icon && <Icon className="me-2" style={{ color: "#ffa200" }} />}
                      <span>{value}</span>
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="col-12 col-md-3">
            <h5 className="fw-bold" style={{ color: "#ffa200" }}>Follow Us</h5>
            <div className="d-flex gap-5 mt-2">
              {SOCIAL.map((item) => {
                const Icon = item.icon;
                return (
                  <a target="_blank" key={item.id} href={item.link} className="text-white fs-5">
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
