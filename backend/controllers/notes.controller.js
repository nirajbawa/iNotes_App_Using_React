const NotesModel = require("../models/Notes.model");
let { validationResult } = require("express-validator");

class notes {
    getNotes = async (req, res) => {
        try {
            const userId = req.user.id;
            const tag = req.params.cat
            console.log(req.params.cat)
            const result = await this.fetchNotes(userId, tag);
            res.status(200).json(result);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "internal server error" })
        }
    };

    fetchNotes = async (uId, tag) => {
        let data = {user: uId}

        if(tag!=='-')
        {
            data.tag = tag
        }
        
        console.log(data)

        const Notes = await NotesModel.find(data).sort({Date:-1});
        return Notes;
    };

    postNote = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            } else {
                const userId = req.user.id
                let dataobj = {
                    user: userId,
                    title: req.body.title,
                    description: req.body.description,
                    
                }
                if(req.body.tag)
                {
                    dataobj.tag = req.body.tag
                }

                let result = await this.createNote(dataobj)
                res.status(200).json(result)
            }

        } catch(e){
            console.log(e)
            res.status(500).json({ error: "internal server error" })
        }
    };

    createNote = async (data) => {
        const NotesObj = new NotesModel(data)
        return await NotesObj.save();
    };

    patchNote = async (req, res) =>{
        try{
            const data = {}
            if(req.body.title)
            {
                data.title = req.body.title
            }
            if(req.body.description)
            {
                data.description = req.body.description
            }
            if(req.body.tag)
            {
                data.tag = req.body.tag
            }

            const note = await NotesModel.findById(req.params.id)
            if(!note)
            {
                return res.status(404).json({error:"Not found"})
            }
            if(note.user.toString() !== req.user.id)
            {
                return res.status(401).json({error:"Not allowed"})
            }
            const result = await this.updateNotes(req.params.id, data)
            res.status(200).json(result)
        }
        catch(e)
        {
            console.log(e)
            res.status(500).json({ error: "internal server error" })
        }
      
    }

    updateNotes = async (id,data) =>{
        const result = await NotesModel.findByIdAndUpdate(id, {$set:data}, {new:true})
        return result
    }

    deleteNotes = async (req, res) =>{
        try{
            const note = await NotesModel.findById(req.params.id)
            // check note is exists
            if(!note)
            {
                return res.status(404).json({error:"Not found"})
            }
            // allow deletion if user own this note
            if(note.user.toString() !== req.user.id)
            {
                return res.status(401).json({error:"Not allowed"})
            }

            const result = await this.deleteNotesUsingId(req.params.id)
            res.status(200).json(result)
        }
        catch(e)
        {
            console.log(e)
            res.status(500).json({ error: "internal server error" })
        }
    }


    deleteNotesUsingId = async (id) =>{
        const result = await NotesModel.findByIdAndDelete(id)
        return result
    }

}

module.exports = new notes();
