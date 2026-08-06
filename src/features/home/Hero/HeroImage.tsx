import { Star, Clock3, MapPin } from "lucide-react";


export default function HeroImage(){
    return(
        <div className="relative flex justify-center">
        <div className="flex h-[520px] w-[520px] items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-orange-300/20 shadow-2xl"></div>
        <div className="absolute left-0 top-20 rounded-2xl border bg-background px-5 py-4 shadow-xl">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">4.9 Rating</span>
          </div>
        </div>
        <div className="absolute bottom-20 right-0 rounded-2xl border bg-background px-5 py-4 shadow-xl">
          <div className="flex items-center gap-2">
            <Clock3 className="h-5 w-5 text-primary" />
            <span className="font-semibold">15 min Delivery</span>
          </div>
        </div>
        {/* <div className="absolute right-20 top-72 rounded-2xl border bg-background px-5 py-4 shadow-xl">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-500" />
            <span className="font-semibold">120+ Restaurants</span>
          </div>
        </div> */}
      </div>
    );
}