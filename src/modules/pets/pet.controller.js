

class PetController {


    async createPet(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }


}


export const petController = new PetController();