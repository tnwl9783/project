const Sequelize=require("sequelize");


//User로 모델 만들고 exports함, 모델은 크게 static init 메서드와 static associate메서드로 나뉨, init 메서드는 테이블에 대한 설정, associate 메서드에는 다른 모델과의 관계를 적는다.
module.exports=class Comment extends Sequelize.Model{
static init(sequelize){
    return super.init({
        comment : {
            type : Sequelize.STRING,
            allowNull :false
        },
        created_at : {
            type : Sequelize.DATE,
            allowNull :true,
            defaultValue : Sequelize.NOW
        }

    }, {
        sequelize,   //나중에 model/index.js에서 연결
        timestamps : false, // true이면 createdAt과 updatedAt 칼럼 추가, 자동으로 날짜 칼럼 추가하는 기능 해제        
        modelName:'Comment',
        tableName:'comments',
        paranoid : false,  // true로 설정하면 deletedAt이라는 칼럼이 생김, 로우를 삭제할 때 완전히 지워지지 않고 deletedAt에 지운 시각이 기록, 복원을 위해
        charset : 'utf8',
        collate : 'utf8mb4_general_ci'

    });
}

static associate(db){
    db.Comment.belongsTo(db.User, {foreignKey : 'commenter', targetKey:'id'});
}
};