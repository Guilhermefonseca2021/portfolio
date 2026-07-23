export default function FooterSocial() {

    return(

        <div>

            <h3
                className="
                    mb-6
                    font-bold
                    text-secondaryText
                "
            >
                Redes

            </h3>

            <ul className="space-y-4">

                <li>

                    <a
                        href="https://github.com/Guilhermefonseca2021"
                        target="_blank"
                        rel="noreferrer"
                        className="
                            text-secondaryText/70
                            transition
                            hover:text-primary
                        "
                    >
                        GitHub
                    </a>

                </li>

                <li>

                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="
                            text-secondaryText/70
                            transition
                            hover:text-primary
                        "
                    >
                        LinkedIn
                    </a>

                </li>

                <li>

                    <a
                        href="mailto:email@email.com"
                        className="
                            text-secondaryText/70
                            transition
                            hover:text-primary
                        "
                    >
                        Email
                    </a>

                </li>

            </ul>

        </div>

    )

}