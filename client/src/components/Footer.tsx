import linkedIn from "@/assets/img/LI.svg";

const Footer = () => {
  return (
    <div className="mt-auto pt-24">
      <div className="bg-gray-bg py-6 border-t border-gray-border">
        <div className="custom-container">
          <a href="https://www.linkedin.com/in/yakiv-manitskiy-84a394285/" target="_blank">
            <img className="max-w-8 max-h-8" src={linkedIn} alt="LinkedIn"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;