const Service = require('../../models/vendor/service.model');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

exports.createService = async (req, res) => {
    const { serviceName, vendorCommission, imgData } = req.body;
    let data;
    try {
        if (imgData) {
             data = await ServiceIcon(imgData)
        }

        const iconPath = `${process.env.UPLOAD_URL}`+data.slice(5);

        const newService = await Service.create({
            serviceName,
            vendorCommission,
            serviceIcon: iconPath
        });

        res.status(201).json(newService);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

exports.addItemToService = async (req, res) => {
    const { serviceId, itemName, unitPrice, imgData } = req.body;

    try {
        const service = await Service.findOne({ serviceId: serviceId });

        let data;

        if (imgData) {
            data = await ItemIcon(imgData)
        }

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        if (!itemName && !unitPrice) {
            return res.status(404).json({ error: 'No item details provided' });
        }

        const iconPath = `${process.env.UPLOAD_URL}`+data.slice(5);

        service.items.push({
            name: itemName,
            unitPrice: unitPrice,
            itemIcon: iconPath
        });

        await service.save();

        res.status(200).json(service);
    } catch (err) {
        res.status(500).json({
            error: 'Could not add item to service',
            message: err.message
        });
    }
}

exports.deleteItem = async (req, res) => {
    const { serviceId, itemId } = req.body;
    try {
        if (!serviceId || !itemId) { 
        res.status(400).json({error:'complete data not found'});
    }

    const service = await Service.findOne({ serviceId:serviceId })
    
    if (!service) {
        res.status(400).json({error:'service not found'});
    }

    const itemIndex = service.items.findIndex(item => item.itemId.toString() === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ error: 'Item not found in the service' });
        }

        // Remove the item from the items array
        service.items.splice(itemIndex, 1);

        // Save the updated service
        await service.save();

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getServiceDetails = async (req, res) => {
    const { serviceId } = req.body;
    try {
        const service = await Service.find({serviceId:serviceId})
        
        res.status(201).json(service);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

exports.deleteService = async (req, res) => {
    const { serviceId } = req.body;

    try {
        const service = await Service.findOneAndDelete(serviceId);

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        return res.json({ message: "Service deleted successfully", service });
    } catch (error) {
        return res.status(500).json({ error: 'Could not delete service', message: error.message });
    }
};

exports.editService = async (req, res) => {
    
    const { imgData, serviceName, serviceId, vendorCommission } = req.body;

    try {
        const service = await Service.findOne({ serviceId: serviceId });

        if (service.serviceIcon) {
            await deleteFile(service.serviceIcon);
        }
        

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        if (imgData) {
            const data = await ServiceIcon(imgData);
            const iconPath = `${process.env.UPLOAD_URL}`+data.slice(5);
            service.serviceIcon = iconPath;
        }

        if (serviceName) {
            service.serviceName = serviceName;
        }
        if (vendorCommission) {
            service.vendorCommission = vendorCommission;
        }

        await service.save();

        res.json({ message: "Service updates successfully", service });
    } catch (error) {
        res.status(500).json({ error: 'Could not edit service', message: error.message });
    }
};

exports.editItemInService = async (req, res) => {
    const { serviceId, itemId, newName, newUnitPrice, imgData } = req.body;
    let data;

    try {
        const service = await Service.findOne({ serviceId });

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        const item = service.items.find(item => item.itemId === itemId);

        if (item.itemIcon) {
            await deleteFile(item.itemIcon);
        }

        if (!item) {
            return res.status(404).json({ error: 'Item not found in service' });
        }

        if (imgData) {
             data = await ItemIcon(imgData)
             const iconPath = `${process.env.UPLOAD_URL}`+data.slice(5);
            item.itemIcon = iconPath
        }

        if (newName) {
            item.name = newName;
        }
        if (newUnitPrice) {
            item.unitPrice = newUnitPrice;
        }

        await service.save();

        res.json({ message: "Service updates successfully", service });
    } catch (error) {
        res.status(500).json({ error: 'Could not edit item in service', message: error.message });
    }
};

exports.fetchServices = async (req, res) => {
    const service = await Service.find()
    try {
        res.json({ message: "Service fetched successfully", service });
    } catch (error) {
        res.status(500).json({ error: 'Could not find service', message: error.message });
    }
}

exports.fetchItem = async (req, res) => {
    const { serviceId, itemId } = req.body;

    try {
        const service = await Service.findOne({ serviceId });

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        const item = service.items.find(item => item.itemId === itemId);

        if (!item) {
            return res.status(404).json({ error: 'Item not found in the specified service' });
        }

        res.json({ message: "Item fetched successfully", item });
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch item', message: error.message });
    }
};

async function ServiceIcon(icon) {
    if (!icon) {
        return null;
    }

    const DocsDir = path.join(process.env.FILE_SAVE_PATH, 'ServiceIcon');

    if (!fs.existsSync(DocsDir)) {
        fs.mkdirSync(DocsDir, { recursive: true });
    }

    const picBuffer = Buffer.from(icon, 'base64');
    const picFilename = `${uuidv4()}.jpg`;
    const picPath = path.join(DocsDir, picFilename);

    fs.writeFileSync(picPath, picBuffer);

    return picPath;
}

async function ItemIcon(icon) {
    if (!icon) {
        return null;
    }

    const DocsDir = path.join(process.env.FILE_SAVE_PATH, 'ItemIcon');

    if (!fs.existsSync(DocsDir)) {
        fs.mkdirSync(DocsDir, { recursive: true });
    }

    const picBuffer = Buffer.from(icon, 'base64');
    const picFilename = `${uuidv4()}.jpg`;
    const picPath = path.join(DocsDir, picFilename);

    fs.writeFileSync(picPath, picBuffer);

    return picPath;
}

function deleteFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    resolve();
                } else {
                    reject(err);
                }
            } else {
                resolve();
            }
        });
    });
}