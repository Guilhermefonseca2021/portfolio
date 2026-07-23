type Props = {

    name:string;

}

export default function ProjectBadge({

    name

}:Props){

    return(

        <span
            className="
                rounded-full
                border
                border-primary/30
                bg-primary/10
                px-3
                py-1
                text-xs
                font-medium
                text-primary
            "
        >

            {name}

        </span>

    )

}