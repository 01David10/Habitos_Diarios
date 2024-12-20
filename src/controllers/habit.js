import habit from "../models/habit.js"; // import del objecto habit

export const createHabit = async (req, res) => {
    //Funcion para Crear, Guardar el habito
    const { category, name, frecuency } = req.body; //requerimientos

    try {
        const newHabit = new habit({
            //Crear Habito
            category,
            name,
            frecuency,
            // user: req.user.id,
        });

        const habitSaved = await newHabit.save(); //Guardar Habito

        res.json({
            // Respuesta del servidor de los parametros del habito
            id: habitSaved.id,
            category: habitSaved.category,
            name: habitSaved.name,
            frecuency: habitSaved.frecuency,
            createdAt: habitSaved.createdAt,
            updatedAt: habitSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getHabits = async (req, res) => {
    //Funcion para Obtener los habitos
    try {
        const habits = await habit.find({ user: req.user.id }); // Encontrar Habitos de 
        res.json(habits); //Mostrar Habitos
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getHabitByCategory = async (req, res) => {
    //Funcion para Obtener un habito
    try {
        const habitFound = await habit.find({category: req.params.category}); // Encontrar Habito por ID
        res.json(habitFound); //Mostrar Habitos
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateHabit = async (req, res) => {
    //Funcion para Actualizar un habito
    const { name, frecuency } = req.body; //requerimientos
    try {
        await
            habit.findByIdAndUpdate(req.params.id, { name, frecuency }); //Actualizar Habito por ID
        res.json({ message: "Habito Actualizado" }); //Mensaje de Habito Actualizado
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteHabit = async (req, res) => {
    //Funcion para Eliminar un habito
    try {
        await habit.findByIdAndDelete(req.params.id); //Eliminar Habito por ID
        res.json({ message: "Habito Eliminado" }); //Mensaje de Habito Eliminado
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
