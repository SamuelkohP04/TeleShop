import tarot_card_img from "../product-images/CuteTarotReader.jpg"
import numerology_img from "../product-images/CoolNumberBoy.jpg"
import tarot_card_numerology_img from "../product-images/TarotAndNumerlogy.jpg"


export function getData(){
    return [
        {title: "Tarot Card Session", price: 68, Image: tarot_card_img,id:1},
        {title: "Numerology", price: 68, Image: numerology_img,id:2},
        {title: "Tarot Card + Numerology", price: 118, Image: tarot_card_numerology_img,id:3},
    ]
}

