type Props = {

    title:string;

    links:string[];

}

export default function FooterColumn({

    title,

    links

}:Props){

    return(

        <div>

            <h3
                className="
                    mb-6
                    font-bold
                    text-secondaryText
                "
            >
                {title}
            </h3>

            <ul className="space-y-4">

                {

                    links.map(link=>(

                        <li key={link}>

                            <a
                                href="#"
                                className="
                                    text-secondaryText/70
                                    transition
                                    hover:text-primary
                                "
                            >
                                {link}
                            </a>

                        </li>

                    ))

                }

            </ul>

        </div>

    )

}