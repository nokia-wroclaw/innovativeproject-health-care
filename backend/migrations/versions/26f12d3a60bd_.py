"""Add subject column to questions table

Revision ID: 26f12d3a60bd
Revises: 
Create Date: 2019-08-06 13:05:24.227371

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '26f12d3a60bd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('questions', sa.Column('subject', sa.String(), server_default='', nullable=False))
    op.alter_column('questions', 'question',
               existing_type=sa.VARCHAR(),
               nullable=False)


def downgrade():
    op.alter_column('questions', 'question',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.drop_column('questions', 'subject')
